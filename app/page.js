// "use client";

// import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
// import { firestore } from "./firebase";
// import React, { useEffect } from 'react'

// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from 'firebase/firestore'

// const item = ["tomato", "potato", "onion", "garlic", "brown bread", "spring onion", "milk", "butter", "ghee", "flour", "atta"]

// // export default function Home() {
// //   useEffect(() => {
// //     const items = collection(firestore, 'pantry')
// //     console.log(items.docs)
// //   }, [])

// export default function Home() {
//   useEffect(() => {
//     const fetchItems = async () => {
//       const itemsCollection = collection(firestore, 'pantry');
//       const itemsSnapshot = await getDocs(itemsCollection);
//       const itemsList = itemsSnapshot.docs.map(doc => doc.data());
//       console.log(itemsList);
//     };

//     fetchItems();
//   }, []);


//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       //bgcolor="#E9EDDE"
//       display={'flex'}
//       justifyContent={'center'}
//       flexDirection={'column'}
//       alignItems={'center'}
//     >
//       <Box border={'2px solid #4C5752'}>
//       <Box width="800px" height="100px" bgcolor="#E9EDDE" display={'flex'} justifyContent={'center'}>
//         <Typography variant="h2" color={'#4C5752'} textAlign={'center'}>
//                 Pantry AI
//         </Typography>
//       </Box>


//       <Stack width="800px" height="200px" spacing={2} overflow="auto">
//         {item.map((i) => (
//           <Box
//             key={i}
//             width="100%"
//             height="100px"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             bgcolor="#E9EDDE"
//           >
//             <Typography
//               variant={'h5'}
//               color={'#4C5752'}
//               textAlign={'center'}
//               //fontWeight={'bold'}
//             >
//             {i.charAt(0).toUpperCase() + i.slice(1)}
//             </Typography>
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//     </Box>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from './firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #4C5752'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#B9BAA3'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#4C5752'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#E9EDDE'}
              paddingX={5}
            >
              <Typography variant={'h4'} color={'#4C5752'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h5'} color={'#4C5752'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}