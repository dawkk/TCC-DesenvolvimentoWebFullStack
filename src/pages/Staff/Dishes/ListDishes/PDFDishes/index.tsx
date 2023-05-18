import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import IDish from '../../../../../interfaces/IDish';

interface DishPDFProps {
  dishes: IDish[];
}

const DishPDF: React.FC<DishPDFProps> = ({ dishes }) => {
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
    dishContainer: {
      marginBottom: 20,
    },
    dishTitle: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    dishDescription: {
      fontSize: 12,
      marginBottom: 3,
    },
    dishPrice: {
      fontSize: 12,
      marginBottom: 3,
    },
    dishType: {
      fontSize: 12,
      marginBottom: 3,
    },
    dishMenu: {
      fontSize: 12,
      marginBottom: 10,
    },
  });

  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Listagem de Pratos</Text>
          {dishes.map((dish) => (
            <View key={dish._id} style={styles.dishContainer}>
              <Text style={styles.dishTitle}>{dish.title}</Text>
              <Text style={styles.dishDescription}>{dish.description}</Text>
              <Text style={styles.dishPrice}>Preço: R${dish.price}</Text>
              <Text style={styles.dishType}>Tipo: {dish.type}</Text>
              <Text style={styles.dishMenu}>Menu: {dish.menu?.name}</Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default DishPDF;