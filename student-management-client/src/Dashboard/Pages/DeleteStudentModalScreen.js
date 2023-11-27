import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";

export default function DeleteStudentModalScreen({ student }) {
  const Token = JSON.parse(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  //delete student
  async function deleteStudent(id) {
    try {
      await fetch(`${base_url}student/student/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${Token.token}`,
        },
      });
      window.location = "/studentreg";
      toast.success("students deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <DeleteForever sx={{ color: "red" }} />
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
            {''}-            
            {student.admission}          
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
              onClick={() => deleteStudent(student._id)}
            >
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
