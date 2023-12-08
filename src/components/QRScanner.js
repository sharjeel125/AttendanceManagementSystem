import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      // Handle QR code data and navigate to the next screen
      console.log("data", data);
      navigation.navigate('VerifyDevice', { deviceId: data });
    }
  };

  const requestPermissionAgain = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionDeniedContainer}>
        <Button title="Request Permission Again" onPress={requestPermissionAgain} />
        <Text style={{ marginVertical: 10 }}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRScanner;
