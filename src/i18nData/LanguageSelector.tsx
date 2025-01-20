import { Button, ButtonGroup } from '@mui/material';
import { useStore } from '../store/Store.tsx';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

// Custom styles
const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: '1rem',
  },
  button: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#1976d2',
    },
  },
  activeButton: {
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#145ca6',
    },
  },
});

const LanguageSelector = () => {
  const { setLanguage } = useStore();
  const { i18n } = useTranslation();
  const classes = useStyles();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ButtonGroup className={classes.buttonGroup} variant="text" aria-label="language selector">
      {['en', 'fr', 'tel'].map((lang) => (
        <Button
          key={lang}
          className={`${classes.button} ${
            i18n.language === lang ? classes.activeButton : ''
          }`}
          onClick={() => handleLanguageChange(lang)}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default LanguageSelector;
