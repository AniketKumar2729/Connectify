import { Avatar, Box, Stack } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'
import { fileFormat, tranformImage } from '../../lib/features'
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import RenderAttachments from "../../components/shared/RenderAttachments";
const columns = [
  {
    field: 'id', headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: 'attachments', headerName: "attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? attachments.map((i) => {
        const url = i.url;
        const file = fileFormat(url);
        return <Box>
          <a href={url} download _target='_blank' style={{ color: 'black' }}>
            {RenderAttachments(file, url)}
          </a>
        </Box>
      }) : "No Attachments"
      // return
    }
  },
  {
    field: 'content', headerName: "Content",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      if (params.row.content == '')
        return "No content"
      return params.row.content
    }
  },
  {
    field: 'sender', headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}><Avatar alt={params.row.sender.name} src={params.row.sender.avatar} /><span>{params.row.sender.name}</span></Stack>
  },
  {
    field: 'chat', headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: 'groupChat', headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
    renderCell: (params) => params.row.groupChat ? <CheckIcon sx={{ color: 'green' }} /> : <NotInterestedIcon sx={{ color: 'red' }} />
  },
  {
    field: 'createdAt', headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
]
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dashboardData.messages.map((i) => ({
      id: i._id,
      content: i.content,
      groupChat: i.groupChat,
      chat: i.chat,
      attachments: i.attachments,
      sender: {
        name: i.sender.name,
        avatar: tranformImage(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    })))
  }, [])

  return (
    <AdminLayout>
      <Table heading={'all messages'} rows={rows} columns={columns} rowHeight={200} />
    </AdminLayout>
  )
}

export default MessageManagement