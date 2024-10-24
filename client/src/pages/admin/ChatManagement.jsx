import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import AvatarCard from "../../components/shared/AvatarCard.jsx";
import { Avatar, Stack } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import { tranformImage } from '../../lib/features'
const columns = [
  {
    field: 'id', headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: 'avatar', headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />
  },
  {
    field: 'name', headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: 'totalMember', headerName: "Total Member",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: 'members', headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => <AvatarCard max={100} avatar={params.row.members} />
  },
  {
    field: 'totalMessages', headerName: "Total Messages",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: 'creator', headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
]
const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dashboardData.chats.map((i)=>({
      ...i,
      id:i._id,
      totalMember:i.totalMember,
      totalMessages:i.totalMessages,
      avatar:i.avatar.map(i=>tranformImage(i,50)),
      members:i.members.map((i)=>tranformImage(i.avatar,50)),
      creator:{
        name:i.creator.name,
        avatar:tranformImage(i.creator.avatar,50)
      }
    })))
  }, [])

  return (
    <AdminLayout>
      <Table heading={"all chats"} rows={rows} columns={columns} />
    </AdminLayout>
  )
}

export default ChatManagement