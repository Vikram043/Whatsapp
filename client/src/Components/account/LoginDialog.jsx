import React, { useContext } from 'react';
import { Dialog, Typography, List, ListItem, Box, styled, Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 0px 0 56px 56px;
`;
const DownloadContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 100px 30px 100px;
  border:1px solid black;
  padding:25px 50px 25px 50px;
  border-radius:10px
`;

const QRCOde = styled('img')({
  margin: '10px 0 0 50px',
  height: 264,
  width: 264,
});

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #525252;
  }
`;

const StyledButton = styled(Button)`
  background-color: #128c7e; /* WhatsApp Green */
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

const dialogStyle = {
  marginTop: '12%',
  height: '95%',
  width: '60%',
  maxWidth: '100',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden',
};

const GetAppButton = styled(Button)`
  background-color: #00A884;
  color: #fff;
  width:180px;
  border-radius:20px
`;
const LoginDialog = () => {
  const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } =
    useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    console.log(res.credential.accessToke);
    let decoded = jwt_decode(res.credential);
    setAccount(decoded);
    setShowloginButton(false);
    setShowlogoutButton(true);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  return (
    <Dialog
      open={true}
      BackdropProps={{ style: { backgroundColor: 'unset' } }}
      maxWidth={'md'}
      PaperProps={{ sx: dialogStyle }}
    >
        <DownloadContainer>
          <svg viewBox="0 0 76 51" height="55" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>wa-desktop</title><rect x="9" y="2.04663" width="58" height="37.8605" fill="#00A884"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H66V38.8837H10V3ZM7 38.8837V3C7 1.34315 8.34315 0 10 0H66C67.6569 0 69 1.34315 69 3V38.8837H76V40C76 42.2091 74.2091 44 72 44H66H10H4C1.79086 44 0 42.2091 0 40V38.8837H7Z" fill="#54656F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H66V38.8837H10V3ZM7 38.8837V3C7 1.34315 8.34315 0 10 0H66C67.6569 0 69 1.34315 69 3V38.8837H76V40C76 42.2091 74.2091 44 72 44H66H10H4C1.79086 44 0 42.2091 0 40V38.8837H7Z" fill="black" fill-opacity="0.6"></path><rect x="21" y="17" width="34" height="34" rx="2" fill="#25D366"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M27.0892 33.9037C27.0917 27.8907 32.0063 23 38.0448 23C40.9738 23.0012 43.7255 24.1367 45.7937 26.1974C47.8619 28.258 49.0011 30.9991 49 33.9124C48.9975 39.9254 44.0826 44.8167 38.0447 44.8167C36.2561 44.8161 34.5003 44.3824 32.9299 43.5562L27.4448 44.9881C27.1805 45.0571 26.9406 44.8141 27.0131 44.5507L28.4779 39.2259C27.5663 37.6025 27.0885 35.7738 27.0892 33.9037ZM38.0393 42.8705H38.0357C36.4369 42.8699 34.8688 42.4424 33.5009 41.6345L33.1755 41.4423L29.8034 42.3227L30.7034 39.0504L30.4916 38.7149C29.5997 37.3031 29.1286 35.6714 29.1294 33.9958C29.1313 29.1067 33.1283 25.1291 38.0429 25.1291C40.4227 25.1299 42.6597 26.0534 44.342 27.7296C46.0241 29.4057 46.95 31.6336 46.9491 34.003C46.9471 38.8925 42.9502 42.8705 38.0393 42.8705ZM41.0435 35.2728C41.2876 35.3625 42.5971 36.0117 42.8635 36.146C42.9154 36.1722 42.964 36.1959 43.0091 36.2178C43.1949 36.3083 43.3204 36.3694 43.3739 36.4595C43.4405 36.5714 43.4405 37.1088 43.2186 37.7358C42.9966 38.3627 41.9325 38.9349 41.4208 39.0119C40.9619 39.081 40.3812 39.1099 39.7432 38.9056C39.3564 38.7819 38.8602 38.6168 38.2248 38.3402C35.7281 37.2539 34.0409 34.8157 33.7217 34.3544C33.6993 34.322 33.6836 34.2994 33.6749 34.2877L33.6727 34.2848C33.5318 34.0953 32.5873 32.8255 32.5873 31.5112C32.5873 30.275 33.1899 29.627 33.4673 29.3287C33.4863 29.3083 33.5038 29.2895 33.5195 29.2722C33.7636 29.0036 34.0522 28.9364 34.2298 28.9364C34.4073 28.9364 34.5851 28.9381 34.7402 28.9459C34.7594 28.9468 34.7793 28.9467 34.7999 28.9466C34.9551 28.9457 35.1486 28.9446 35.3395 29.4066C35.4128 29.584 35.5199 29.8469 35.633 30.1243C35.8624 30.687 36.1161 31.3095 36.1607 31.3994C36.2273 31.5338 36.2717 31.6904 36.1829 31.8696C36.1696 31.8965 36.1573 31.9218 36.1455 31.946C36.0788 32.0832 36.0298 32.1842 35.9165 32.3173C35.8722 32.3695 35.8264 32.4257 35.7806 32.482C35.6888 32.5946 35.597 32.7073 35.517 32.7876C35.3837 32.9214 35.2449 33.0666 35.4003 33.3353C35.5556 33.604 36.0902 34.4829 36.8819 35.1945C37.7331 35.9596 38.4729 36.2829 38.8478 36.4468C38.921 36.4788 38.9803 36.5047 39.0238 36.5267C39.2901 36.6611 39.4455 36.6386 39.6009 36.4595C39.7562 36.2804 40.2667 35.6758 40.4443 35.4071C40.6218 35.1385 40.7994 35.1832 41.0435 35.2728Z" fill="white"></path></svg>
          <ListItem>Download WhatsApp for Windows</ListItem>
        <GetAppButton variant="contained">Get the App</GetAppButton>
        </DownloadContainer> 
      <Component>
        <Container>   
          <StyledList>
          <p style={{fontSize:"28px", color:"#3B4A54"}}>Use WhatsApp on your computer</p>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu &nbsp;
            <span><svg height="24px" viewBox="0 0 24 24" width="24px"><rect fill="#f2f2f2" height="24" rx="3" width="24"></rect><path d="m12 15.5c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5-1.5-.675-1.5-1.5.675-1.5 1.5-1.5zm0-2c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zm0-5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z" fill="#818b90"></path></svg></span>&nbsp;
             Settings &nbsp;
             <span><svg width="24" height="24" viewBox="0 0 24 24"><rect fill="#F2F2F2" width="24" height="24" rx="3"></rect><path d="M12 18.69c-1.08 0-2.1-.25-2.99-.71L11.43 14c.24.06.4.08.56.08.92 0 1.67-.59 1.99-1.59h4.62c-.26 3.49-3.05 6.2-6.6 6.2zm-1.04-6.67c0-.57.48-1.02 1.03-1.02.57 0 1.05.45 1.05 1.02 0 .57-.47 1.03-1.05 1.03-.54.01-1.03-.46-1.03-1.03zM5.4 12c0-2.29 1.08-4.28 2.78-5.49l2.39 4.08c-.42.42-.64.91-.64 1.44 0 .52.21 1 .65 1.44l-2.44 4C6.47 16.26 5.4 14.27 5.4 12zm8.57-.49c-.33-.97-1.08-1.54-1.99-1.54-.16 0-.32.02-.57.08L9.04 5.99c.89-.44 1.89-.69 2.96-.69 3.56 0 6.36 2.72 6.59 6.21h-4.62zM12 19.8c.22 0 .42-.02.65-.04l.44.84c.08.18.25.27.47.24.21-.03.33-.17.36-.38l.14-.93c.41-.11.82-.27 1.21-.44l.69.61c.15.15.33.17.54.07.17-.1.24-.27.2-.48l-.2-.92c.35-.24.69-.52.99-.82l.86.36c.2.08.37.05.53-.14.14-.15.15-.34.03-.52l-.5-.8c.25-.35.45-.73.63-1.12l.95.05c.21.01.37-.09.44-.29.07-.2.01-.38-.16-.51l-.73-.58c.1-.4.19-.83.22-1.27l.89-.28c.2-.07.31-.22.31-.43s-.11-.35-.31-.42l-.89-.28c-.03-.44-.12-.86-.22-1.27l.73-.59c.16-.12.22-.29.16-.5-.07-.2-.23-.31-.44-.29l-.95.04c-.18-.4-.39-.77-.63-1.12l.5-.8c.12-.17.1-.36-.03-.51-.16-.18-.33-.22-.53-.14l-.86.35c-.31-.3-.65-.58-.99-.82l.2-.91c.03-.22-.03-.4-.2-.49-.18-.1-.34-.09-.48.01l-.74.66c-.39-.18-.8-.32-1.21-.43l-.14-.93a.426.426 0 00-.36-.39c-.22-.03-.39.05-.47.22l-.44.84-.43-.02h-.22c-.22 0-.42.01-.65.03l-.44-.84c-.08-.17-.25-.25-.48-.22-.2.03-.33.17-.36.39l-.13.88c-.42.12-.83.26-1.22.44l-.69-.61c-.15-.15-.33-.17-.53-.06-.18.09-.24.26-.2.49l.2.91c-.36.24-.7.52-1 .82l-.86-.35c-.19-.09-.37-.05-.52.13-.14.15-.16.34-.04.51l.5.8c-.25.35-.45.72-.64 1.12l-.94-.04c-.21-.01-.37.1-.44.3-.07.2-.02.38.16.5l.73.59c-.1.41-.19.83-.22 1.27l-.89.29c-.21.07-.31.21-.31.42 0 .22.1.36.31.43l.89.28c.03.44.1.87.22 1.27l-.73.58c-.17.12-.22.31-.16.51.07.2.23.31.44.29l.94-.05c.18.39.39.77.63 1.12l-.5.8c-.12.18-.1.37.04.52.16.18.33.22.52.14l.86-.36c.3.31.64.58.99.82l-.2.92c-.04.22.03.39.2.49.2.1.38.08.54-.07l.69-.61c.39.17.8.33 1.21.44l.13.93c.03.21.16.35.37.39.22.03.39-.06.47-.24l.44-.84c.23.02.44.04.66.04z" fill="#818b90"></path></svg></span>&nbsp;and select WhatsApp Web</ListItem>
            <ListItem>3. Tap <strong>&nbsp; Linked devices &nbsp;</strong> and then <strong>&nbsp; Link a device </strong></ListItem>
            <ListItem>4. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
          {showloginButton && (
            <StyledButton>
                <GoogleLogin
                    buttonText=" Log in with Google"
                    onSuccess={onLoginSuccess}
                    onError={onLoginFailure}
                />
            </StyledButton>
          )}
        </Container>
        <Box style={{ position: 'relative' }}>
          <QRCOde src={qrCodeImage} alt="QR Code" />
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
