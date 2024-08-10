"use client";

import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from "./firebase";
import React, { useEffect } from 'react'

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const item = ["tomato", "potato", "onion", "garlic", "brown bread", "spring onion", "milk", "butter", "ghee", "flour", "atta"]

export default function Home() {
  useEffect(() => {
    const items = collection(firestore, 'pantry')
    console.log(items.docs)
  }, [])

  return (
    <Box
      width="100vw"
      height="100vh"
      //bgcolor="#E9EDDE"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box border={'2px solid #4C5752'}>
      <Box width="800px" height="100px" bgcolor="#E9EDDE" display={'flex'} justifyContent={'center'}>
        <Typography variant="h2" color={'#4C5752'} textAlign={'center'}>
                Pantry AI
        </Typography>
      </Box>


      <Stack width="800px" height="200px" spacing={2} overflow="auto">
        {item.map((i) => (
          <Box
            key={i}
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#E9EDDE"
          >
            <Typography
              variant={'h5'}
              color={'#4C5752'}
              textAlign={'center'}
              //fontWeight={'bold'}
            >
            {i.charAt(0).toUpperCase() + i.slice(1)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
    </Box>
  )
}