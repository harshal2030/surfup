import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';

type Props = {
  buttonViewStyle?: ViewStyle;
  logoStyle?: ImageStyle;
  textStyle?: TextStyle;
  buttonText?: string;
  onPress(): void;
};

class GoogleButton extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={{...styles.googleStyle, ...this.props.buttonViewStyle}}
        activeOpacity={0.8}
        onPress={this.props.onPress}>
        <Image
          source={require('../images/g-logo.png')}
          style={{...styles.imageIconStyle, ...this.props.logoStyle}}
        />
        <Text style={{...styles.textStyle, ...this.props.textStyle}}>
          {this.props.buttonText
            ? this.props.buttonText
            : 'Sign in with Google'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  googleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 60,
    width: '98%',
    borderRadius: 3,
    margin: 5,
  },
  imageIconStyle: {
    marginLeft: 2,
    height: 55,
    width: 50,
    borderWidth: 0.5,
    borderColor: 'transparent',
    borderRadius: 1,
    resizeMode: 'stretch',
  },
  textStyle: {
    color: '#ffff',
    marginLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

export {GoogleButton};
