import React from 'react';
import { Box } from '@material-ui/core';

export default props => {
  const { username, lang } = props;
  switch (lang) {
    case 'it':
      return (
        <Box>
          <Box mb={2}>
            Ciao {username}!
            <br />
            <br />
            Grazie per aver scelto i servizi di{' '}
            <span style={{ color: '#f50057' }}>SmartMenoos</span>!
            <br />
            <br />
            Noi tutti siamo andati incontro a tempi difficili da quando il
            Coronaviur ha iniziato a diffondersi e ciò nonostante molte
            ammirevoli iniziative sono state intraprese cercando di aiutare
            tutta quella gente che si è trovata ad affrontare problemi
            economici. Per questo motivo anche il team di SmartMenoos vorrebbe
            fare la sua parte dando il proprio contributo...
          </Box>
          <Box mb={2}>
            Tutti i servizi offerti da SmartMenoos si intendono completamente
            gratuiti fino all'
            <span style={{ color: '#f50057' }}>1 settembre 2020</span>
          </Box>
          <Box mb={2}>
            A partire dalla suddetta data ti verrà offerto un set di piani di
            abbonamento che potrai aquistare per continuare a utilizzare i
            nostri servizi a seconda delle tue esigenze.
          </Box>
          Il team di <span style={{ color: '#f50057' }}>SmartMenoos</span>
        </Box>
      );
    case 'es':
      return (
        <Box>
          <Box mb={2}>
            ¡Hola, {username}!             
            <br />             
            <br />
            ¡Gracias por elegir los servicios de{' '}
            <span style={{ color: '#f50057' }}>SmartMenoos</span>!             
            <br />             
            <br />
            Todos pasamos por tiempos muy difíciles desde que se extendió el
            coronavirus y muchas buenas iniciativas comenzaron a tratar de
            ayudar a las personas que están enfrenta dificultades económicas.
            Por esta razón, el equipo de SmartMenoos quisiera dar su
            contribución también...
          </Box>
          <Box mb={2}>
            Todos los servicios proporcionados por SmartMenoos serán gratuitos
            hasta{' '}
            <span style={{ color: '#f50057' }}>1 de septiembre de 2020</span>
          </Box>
          <Box mb={2}>
            A partir de la fecha mencionada se le ofrecerá un conjunto de planes
            de suscripción con los que podrá apuntarse para seguir usando
            nuestros servicios elijendo lo que mejor se adapta a todas tus
            esigencias.
          </Box>
          El equipo de <span style={{ color: '#f50057' }}>SmartMenoos</span>
        </Box>
      );
    default:
      return (
        <Box>
          <Box mb={2}>
            Hi {username}!
            <br />
            <br />
            Thanks for choosing{' '}
            <span style={{ color: '#f50057' }}>SmartMenoos</span> services!
            <br />
            <br />
            We all went through very tough times since Coronavirus spread out
            and many nice iniciatives started trying to help people who are
            facing ecomomic difficulties. For this reason the SmartMenoos team
            would like to give its contribution too...
          </Box>
          <Box mb={2}>
            All the service provided by SmartMenoos will be free of charge until{' '}
            <span style={{ color: '#f50057' }}>September the 1st 2020</span>
          </Box>
          <Box mb={2}>
            Starting from the aforementioned date you will be offered a set of
            subscription plans you will be able to sign up with to keep on using
            our services the way they suit better for all your needs.
          </Box>
          The <span style={{ color: '#f50057' }}>SmartMenoos</span> team
        </Box>
      );
  }
};
