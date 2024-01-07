import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    <div style={{marginTop: '10px'}}>
        <Stack>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
            <Skeleton height='40px'/>
        </Stack>
    </div>
  )
}

export default ChatLoading