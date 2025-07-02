import React, { useState, useEffect } from 'react';
import OrderSubmitButton from './OrderSubmitButton';

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Product } from '../types/Product.type';
import { Category } from '../types/Category.type';
import { fetchCategories } from '../api/categoryApi';

export default function ShoppingPage() {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id); // ברירת מחדל לקטגוריה ראשונה
        }
      } catch (error) {
        console.error('שגיאה בטעינת קטגוריות:', error);
      }
    };

    loadCategories();
  }, []);

  const addProduct = () => {
    if (!productName.trim()) return;

    setProducts(prev => {
      const existing = prev.find(
        p => p.description === productName && p.categoryId === categoryId
      );
      if (existing) {
        return prev.map(p =>
          p.description === productName && p.categoryId === categoryId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      const newProduct: Product = {
        categoryId: categoryId,
        description: productName,
        quantity: 1,
      };
      return [...prev, newProduct];
    });

    setProductName('');
  };

  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        סה"כ פריטים: {totalItems}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="שם מוצר"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={categoryId}
              onChange={e => setCategoryId(Number(e.target.value))}
              label="קטגוריה"
            >
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" onClick={addProduct}>
            הוסף
          </Button>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" align="center">מוצרים בסל</Typography>
        <List>
          {products.map((p, idx) => {
            const cat = categories.find(c => c.id === p.categoryId);
            return (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${p.description} (${cat?.description})`}
                  secondary={`כמות: ${p.quantity}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box mt={2}>
        <OrderSubmitButton
          cart={products}
          clearCart={() => {
            setProducts([]); // ריקון הסל
            window.location.href = '/thanks'; // מעבר לעמוד תודה
          }}
        />
      </Box>
    </Box>
    
  );
}


// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   Typography,
//   FormControl,
//   InputLabel,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
// } from '@mui/material';
// import { Product } from './types/Product.type';
// import { Category } from './types/Category.type';

// const initialCategories: Category[] = [
//   { id: 1, description: 'מוצרי ניקיון' },
//   { id: 2, description: 'גבינות' },
//   { id: 3, description: 'ירקות ופירות' },
//   { id: 4, description: 'בשר ודגים' },
//   { id: 5, description: 'מאפים' },
// ];

// export default function ShoppingPage() {
//   const [productName, setProductName] = useState('');
//   const [categoryId, setCategoryId] = useState<number>(1);
//   const [products, setProducts] = useState<Product[]>([]);

//   const addProduct = () => {
//     if (!productName.trim()) return;

//     setProducts(prev => {
//       const existing = prev.find(
//         p => p.description === productName && p.category_id === categoryId
//       );
//       if (existing) {
//         return prev.map(p =>
//           p.description === productName && p.category_id === categoryId
//             ? { ...p, quantity: p.quantity + 1 }
//             : p
//         );
//       }

//       const newProduct: Product = {
//         id: Date.now(), // שימוש במזהה זמני
//         category_id: categoryId,
//         description: productName,
//         quantity: 1,
//       };
//       return [...prev, newProduct];
//     });

//     setProductName('');
//   };

//   const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         סה"כ פריטים: {totalItems}
//       </Typography>

//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="שם מוצר"
//             value={productName}
//             onChange={e => setProductName(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>קטגוריה</InputLabel>
//             <Select
//               value={categoryId}
//               onChange={e => setCategoryId(Number(e.target.value))}
//               label="קטגוריה"
//             >
//               {initialCategories.map(cat => (
//                 <MenuItem key={cat.id} value={cat.id}>
//                   {cat.description}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Button fullWidth variant="contained" onClick={addProduct}>
//             הוסף
//           </Button>
//         </Grid>
//       </Grid>

//       <Box mt={4}>
//         <Typography variant="h6">מוצרים בסל:</Typography>
//         <List>
//           {products.map((p, idx) => {
//             const cat = initialCategories.find(c => c.id === p.category_id);
//             return (
//               <ListItem key={idx}>
//                 <ListItemText
//                   primary={`${p.description} (${cat?.description})`}
//                   secondary={`כמות: ${p.quantity}`}
//                 />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Box>
//     </Box>
//   );
// }
