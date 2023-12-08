import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { verifyEmail } from '../services/api';

const VerifyEmailScreen = ({ navigation }) => {
  const [isEmailVerified, setEmailVerified] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      const response = await verifyEmail('example@email.com');
      if (response.success) {
        setEmailVerified(true);
        navigation.navigate('CheckInOut');
      } else {
        // Handle email verification error
      }
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  return (
    <View>
      <Text>Verify Email Screen</Text>
      {!isEmailVerified && (
        <Button title="Verify Email" onPress={handleVerifyEmail} />
      )}
    </View>
  );
};

export default VerifyEmailScreen;
