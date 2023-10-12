import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteClassModalScreen({ group }) {
  const [open, setOpen] = React.useState(false);
  //delete group
  async function deletegroup(id) {
    try {
      await fetch(`${base_url}classgroup/group/${id}`, {
        method: "DELETE",
      });

      window.location = "/groups";
      toast.success("class deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="error"
        size="medium"
        sx={{ width: "100%", marginTop: "0.5rem" }}
        startIcon={<DeleteIcon />}
      >
        <Link className="link">Delete Class</Link>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            level="h2"
            startDecorator={<WarningRoundedIcon sx={{ color: "red" }} />}
            sx={{ color: "red" }}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to Permanantly Delete
            {""}
            <br />
            {group.abbr}
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={() => deletegroup(group._id)}
            >
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
