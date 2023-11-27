import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { ModalClose } from "@mui/joy";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";

export default function EditRoomScreen({ room }) {
  const Token = JSON.parse(localStorage.getItem("token"));
  const [edit, setEdit] = React.useState({
    //taking known values
    capacity: room.capacity,
    title: room.title,
    block: room.block,
  });

  const { capacity, title, block } = edit;
  const updateRoom = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const body = {
        capacity,
        title,
        block,
      };

      const updateroom = await fetch(`${base_url}room/${room._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": " application/json",
          authorization: `Bearer ${Token.token}`,
        },
        body: JSON.stringify(body),
      });
      const updatedroom = await updateroom.json();
      window.location = "/rooms";
      toast.success("Room update Successfully");
      console.log(updatedroom);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <EditIcon sx={{ color: "blue" }} />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: "500px" }}
        >
          <div>
            <Typography
              component="h1"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Edit Session
            </Typography>
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(-1/4 * var(--IconButton-size))",
                right: "calc(-1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
                bgcolor: "background.surface",
              }}
            />
          </div>
          <form onSubmit={updateRoom}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Room Capacity</FormLabel>
                <Input
                  autoFocus
                  type="number"
                  required
                  onChange={(e) =>
                    setEdit({ ...edit, capacity: e.target.value })
                  }
                  value={capacity}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Room Title</FormLabel>
                <Input
                  required
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  value={title}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Room Block</FormLabel>
                <Input
                  required
                  onChange={(e) => setEdit({ ...edit, block: e.target.value })}
                  value={block}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ width: "100%" }}
              >
                Edit Room
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
