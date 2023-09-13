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

export default function EditSessionScreen({ period }) {
  const [edit, setEdit] = React.useState({
    //taking known values
    session: period.session,
    starttime: period.starttime,
    stoptime: period.stoptime,
  });

  const { session, starttime, stoptime } = edit;
  const updateSession = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const body = { session, starttime, stoptime };

      const updatesession = await fetch(`${base_url}period/${period._id}`, {
        method: "PUT",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify(body),
      });
      const updateperiod = await updatesession.json();
      window.location = "/session";
      toast.success('Session update Successfully');
      console.log(updateperiod);
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
          <form onSubmit={updateSession}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Session</FormLabel>
                <Input
                  autoFocus
                  type="number"
                  required
                  onChange={(e) => setEdit({ ...edit, session: e.target.value })}
                  value={session}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start-Time</FormLabel>
                <Input
                  required
                  onChange={(e) => setEdit({ ...edit, starttime: e.target.value })}
                  value={starttime}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Stop-Time</FormLabel>
                <Input
                  required
                  onChange={(e) => setEdit({ ...edit, stoptime: e.target.value })}
                  value={stoptime}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ width: "100%" }}
              >
                Edit Session
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
