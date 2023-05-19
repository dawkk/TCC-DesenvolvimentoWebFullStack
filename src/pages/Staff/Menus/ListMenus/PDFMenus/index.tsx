import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import IMenu from '../../../../../interfaces/IMenu';

interface MenuPDFProps {
  menus: IMenu[];
}

const MenuPDF: React.FC<MenuPDFProps> = ({ menus }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      padding: '1cm',
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    menuContainer: {
      marginBottom: 20,
    },
    menuName: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    menuImage: {
      width: '200px',
      height: '200px',
      marginBottom: 50,
    },
  });

  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Listagem de Menus</Text>
          {menus.map((menu) => (
            <View key={menu._id} style={styles.menuContainer}>
              <Text style={styles.menuName}>{menu.name}</Text>
              <Text style={styles.menuName}>{menu._id}</Text>
              {menu.imageURL && <Image style={styles.menuImage} src={menu.imageURL} />}
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MenuPDF;
