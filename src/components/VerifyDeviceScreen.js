import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { verifyDevice, checkInOut } from '../services/api';


const VerifyDeviceScreen = ({ navigation, route }) => {

    const deviceId = "ABCDE12345FG";

    const [isDeviceVerified, setDeviceVerified] = useState(false);


    useEffect(() => {
        const verifyAndCheckInOut = async () => {
          try {
            const verificationResponse = await verifyDevice(deviceId);
            console.log("verificationResponse",verificationResponse)
    
            if (verificationResponse.header.status == 200) { 
              // Device is verified, automatically check in/out
              const checkInOutResponse = await checkInOut(deviceId);
              console.log("checkInOutResponse",checkInOutResponse)
    
              if (verificationResponse.header.status == 200) {
                setDeviceVerified(true);
                Alert.alert('Error', 'Error during check-in/out process');
              } else {
                // Handle check-in/out error
                Alert.alert('Error', 'Error during check-in/out process');
                navigation.navigate('VerifyEmail');
              }
            } else {
              // Handle unauthorized device
              Alert.alert('Unauthorized', 'This device is not authorized.');
            }
          } catch (error) {
            console.error('Error verifying device:', error);
            Alert.alert('Error', 'An error occurred while verifying the device.');
          }
        };
    
        verifyAndCheckInOut();
      }, [deviceId, navigation]);


    return (
        <View style={{flex:1 , justifyContent:'center',alignItems:'center'}} >
        
            {/* {!isDeviceVerified && (
                <Button title="Verify Device" onPress={handleVerifyDevice} />
            )} */}
        </View>
    );
};

export default VerifyDeviceScreen;
