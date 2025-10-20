"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar({ history }: { history: any[] }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      animate={{ width: open ? 260 : 70 }}
      className="bg-primary-dark text-white h-screen p-4 fixed left-0 top-0 shadow-lg z-10"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className={`${open ? "block" : "hidden"} text-lg font-semibold`}>Experiments</h1>
        <IconButton onClick={() => setOpen(!open)} className="text-white">
          <MenuIcon />
        </IconButton>
      </div>
      <Divider className="bg-white mb-4" />
      <List>
        {history.map((exp) => (
          <ListItem button key={exp.id}>
            <ListItemText
              primary={open ? exp.prompt.slice(0, 30) + "..." : ""}
              secondary={open ? new Date(exp.createdAt).toLocaleDateString() : ""}
            />
          </ListItem>
        ))}
      </List>
    </motion.aside>
  );
}
