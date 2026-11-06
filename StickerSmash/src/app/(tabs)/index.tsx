
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState, type ComponentRef } from 'react';
import { captureRef } from 'react-native-view-shot';

import {
  Alert,
  Image,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EmojiPicker from '../../components/emoji-picker';

const PlaceholderImage = require('../../../assets/images/icon.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [stickerPosition, setStickerPosition] = useState({ x: 0, y: 0 });
  const [stickerScale, setStickerScale] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const imageRef = useRef<ComponentRef<typeof View>>(null);
  const stickerPositionRef = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);
  const stickerScaleRef = useRef(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        dragStart.current = { ...stickerPositionRef.current };
      },

      onPanResponderMove: (_, gesture) => {
        const next = {
          x: dragStart.current.x + gesture.dx,
          y: dragStart.current.y + gesture.dy,
        };

        stickerPositionRef.current = next;
        setStickerPosition(next);
      },

      onPanResponderRelease: (_, gesture) => {
        const next = {
          x: dragStart.current.x + gesture.dx,
          y: dragStart.current.y + gesture.dy,
        };

        stickerPositionRef.current = next;
        setStickerPosition(next);

        const isTap =
          Math.abs(gesture.dx) < 5 &&
          Math.abs(gesture.dy) < 5;

        if (isTap) {
          const now = Date.now();

          if (now - lastTapTime.current < 350) {
            const nextScale = stickerScaleRef.current === 1 ? 1.5 : 1;

            stickerScaleRef.current = nextScale;
            setStickerScale(nextScale);
            lastTapTime.current = 0;
          } else {
            lastTapTime.current = now;
          }
        }
      },
    })
  ).current;

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      resetSticker();
      setIsEditing(false);
    }
  }

  function resetSticker() {
    setSelectedEmoji(null);
    setStickerPosition({ x: 0, y: 0 });
    stickerPositionRef.current = { x: 0, y: 0 };
    setStickerScale(1);
    stickerScaleRef.current = 1;
    lastTapTime.current = 0;
  }

  function usePhoto() {
    if (selectedImage) {
      setIsEditing(true);
    }
  }

  function goBack() {
    setIsEditing(false);
  }

  function handleSelectEmoji(emoji: string) {
  setSelectedEmoji(emoji);

  // Reinicia apenas a posição e o tamanho da figurinha
  setStickerPosition({ x: 0, y: 0 });
  stickerPositionRef.current = { x: 0, y: 0 };

  setStickerScale(1);
  stickerScaleRef.current = 1;

  lastTapTime.current = 0;

  setIsPickerVisible(false);
}
  

  async function saveImage() {
    if (!imageRef.current || !selectedImage) {
      Alert.alert('Atenção', 'Escolha uma foto antes de salvar.');
      return;
    }

    setIsSaving(true);

    try {
      if (Platform.OS === 'web') {
        const dataUrl = await captureRef(imageRef, {
          format: 'jpg',
          quality: 0.95,
          result: 'data-uri',
        });

        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();

        Alert.alert('Sucesso', 'Sua imagem foi baixada!');
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync({
          writeOnly: true,
        });

        if (!permission.granted) {
          Alert.alert(
            'Permissão necessária',
            'Autorize o acesso para salvar a imagem na galeria.'
          );
          return;
        }

        const localUri = await captureRef(imageRef, {
          format: 'jpg',
          quality: 1,
        });

        await MediaLibrary.Asset.create(localUri);

        Alert.alert('Sucesso', 'Imagem salva na galeria!');
      }
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      Alert.alert('Erro', 'Não foi possível salvar a imagem.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StickerSmash</Text>

      <View style={styles.imageArea}>
        <View
          ref={imageRef}
          collapsable={false}
          style={styles.captureArea}
        >
          <Image
            source={selectedImage ? { uri: selectedImage } : PlaceholderImage}
            style={styles.image}
            resizeMode="contain"
          />

          {selectedEmoji && (
            <Text
              {...panResponder.panHandlers}
              style={[
                styles.sticker,
                {
                  transform: [
                    { translateX: stickerPosition.x },
                    { translateY: stickerPosition.y },
                    { scale: stickerScale },
                  ],
                },
              ]}
            >
              {selectedEmoji}
            </Text>
          )}
        </View>
      </View>

      {!isEditing ? (
        <>
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose a photo</Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              !selectedImage && styles.disabledButton,
            ]}
            onPress={usePhoto}
            disabled={!selectedImage}
          >
            <Text style={styles.buttonText}>Use this photo</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={styles.button}
            onPress={() => setIsPickerVisible(true)}
          >
            <Text style={styles.buttonText}>Choose a sticker</Text>
          </Pressable>

          {selectedEmoji && (
            <Pressable style={styles.button} onPress={resetSticker}>
              <Text style={styles.buttonText}>Remove sticker</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.button}
            onPress={saveImage}
            disabled={isSaving}
          >
            <Text style={styles.buttonText}>
              {isSaving ? 'Saving...' : 'Save image'}
            </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={goBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        </>
      )}

      <EmojiPicker
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onSelect={handleSelectEmoji}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  imageArea: {
    width: 280,
    height: 280,
    marginBottom: 25,
  },
  captureArea: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  image: {
    width: 280,
    height: 280,
  },
  sticker: {
    position: 'absolute',
    fontSize: 65,
    top: 100,
    left: 105,
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#25292e',
    fontWeight: 'bold',
  },
});
