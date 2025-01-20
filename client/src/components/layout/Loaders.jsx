import { Grid2, Skeleton, Stack } from '@mui/material'
import React from 'react'
export const LayoutLoader = () => {
  return (
    <>
      <Grid2 container height={`calc(100vh - 4rem)`} spacing={"1rem"}>
        <Grid2 md={3} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }} size={4} height={"100%"}>
          <Skeleton variant='rectangular' height={"100vh"} />
        </Grid2>
        <Grid2 xs={12} sm={8} md={5} lg={6} size={4} height={"100%"} >
          <Stack spacing={"1rem"}>

            {
              Array.from({ length: 10 }).map((_, idx) => (
                <Skeleton key={idx} variant='rounded' height={"5rem"} />
              ))
            }
          </Stack>
          <Skeleton variant='rectangular' height={""} />
        </Grid2>
        <Grid2 md={4} lg={6} size={4} sx={{ display: { xs: 'none', md: 'block' } }} height={"100%"}>
          <Skeleton variant='rectangular' height={"100vh"} />
        </Grid2>
      </Grid2>
    </>
  )
}

export const TypingLoader = () => {
  return (
    <div>
    <style>
      {`
      .typing-loader-wrapper {
        display: flex;
        justify-content: flex-start; /* Align to left */
        align-items: center;
        padding: 5px 10px;
      }

      .typing-loader {
        display: flex;
        align-items: center;
        background: #f1f1f1; /* Light background for a chat bubble effect */
        padding: 8px 12px;
        border-radius: 15px;
      }

      .typing-loader__dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 2px;
        animation: typingAnimation 1.2s infinite ease-in-out;
      }

      .typing-loader__dot:nth-of-type(1) {
        background-color: #007aff;
        animation-delay: 0s;
      }

      .typing-loader__dot:nth-of-type(2) {
        background-color: #ff2d55;
        animation-delay: 0.2s;
      }

      .typing-loader__dot:nth-of-type(3) {
        background-color: #34c759;
        animation-delay: 0.4s;
      }

      @keyframes typingAnimation {
        0% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.4); opacity: 1; }
        100% { transform: scale(1); opacity: 0.3; }
      }
      `}
    </style>

    <div className="typing-loader-wrapper">
      <div className="typing-loader">
        <div className="typing-loader__dot"></div>
        <div className="typing-loader__dot"></div>
        <div className="typing-loader__dot"></div>
      </div>
    </div>
  </div>
  );
}
