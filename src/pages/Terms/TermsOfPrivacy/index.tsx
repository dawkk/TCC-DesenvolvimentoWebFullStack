import { Box, Grid, Typography } from "@mui/material";
import colorTheme from "../../../components/ColorThemes";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";


const TermsOfPrivacy = () => {

  return (
    <Box sx={{ backgroundColor: colorTheme.palette.primary.light }}>
      <NavBar />
      <Box sx={{ backgroundColor: colorTheme.palette.primary.light, height: '100%', minHeight: '89vh', paddingTop: 20, paddingBottom:10 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={8} md={6} lg={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h4" component="h2">
                  Politica privacidade
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" component="h3">
                  Política de Privacidade para Website La Cookeria
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Introdução e Visão Geral:
                </Typography>
                <Typography variant="body1" component="p">
                  Esta Política de Privacidade rege a coleta, uso e proteção das informações pessoais obtidas por meio do nosso website de entrega de alimentos.
                  O website coleta informações pessoais para processar pedidos e facilitar a comunicação com os clientes.
                  Ao utilizar nosso website, você concorda com os termos e práticas descritos nesta Política de Privacidade.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Informações Coletadas:
                </Typography>
                <Typography variant="body1" component="p">
                  Coletamos as seguintes informações pessoais dos usuários:
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" component="p">
                      Nome: Para personalizar a experiência do cliente e nos referirmos aos clientes pelo nome.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p">
                      Sobrenome: Para identificar com precisão os clientes e processar os pedidos.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p">
                      E-mail: Para comunicar confirmações de pedidos, atualizações e responder às perguntas dos clientes.
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Uso das Informações:
                </Typography>
                <Typography variant="body1" component="p">
                  As informações coletadas são utilizadas para os seguintes fins:
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" component="p">
                      Processamento de pedidos: Para cumprir os pedidos dos clientes e entregá-los de maneira precisa e eficiente.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p">
                      Comunicação: Para fornecer confirmações de pedidos, atualizações e responder às perguntas dos clientes.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p">
                      Registro interno: Para manter um registro dos pedidos dos clientes e aprimorar nossos serviços.
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Segurança dos Dados:
                </Typography>
                <Typography variant="body1" component="p">
                  Tomamos medidas apropriadas para proteger as informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                  Todos os dados são criptografados usando métodos padrão do setor, incluindo JWT (JSON Web Tokens) para acesso seguro do lado do cliente aos dados do lado do servidor.
                  O acesso às informações pessoais é restrito apenas aos funcionários autorizados de entrega de alimentos que precisam delas para desempenhar suas funções.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Prestadores de Serviços de Terceiros:
                </Typography>
                <Typography variant="body1" component="p">
                  Podemos contratar prestadores de serviços de terceiros confiáveis para ajudar na entrega de nossos serviços.
                  Esses provedores estão vinculados por acordos de confidencialidade e estão autorizados a usar as informações pessoais exclusivamente para o propósito de fornecer os serviços contratados.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Retenção dos Dados:
                </Typography>
                <Typography variant="body1" component="p">
                  Mantemos as informações pessoais pelo tempo necessário para cumprir os fins descritos nesta Política de Privacidade.
                  Quando os dados não são mais necessários, eles são excluídos ou anonimizados de forma segura, a menos que a retenção seja exigida por lei ou para resolver disputas.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Atualizações da Política de Privacidade:
                </Typography>
                <Typography variant="body1" component="p">
                  Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou requisitos legais.
                  Recomendamos que você reveja esta Política de Privacidade periodicamente para verificar se há atualizações.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="p">
                  Informações de Contato:
                </Typography>
                <Typography variant="body1" component="p">
                  Se você tiver alguma dúvida, preocupação ou solicitação em relação a esta Política de Privacidade ou suas informações pessoais, entre em contato conosco através de email@email.ou pelo numero (99)99999-9999 .
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box >
  )
}

export default TermsOfPrivacy;