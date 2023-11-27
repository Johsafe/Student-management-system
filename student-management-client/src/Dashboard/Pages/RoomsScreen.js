import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import Copyright from "../../Utils/Copyright";
import Header from "../../Utils/Header";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { base_url } from "../../Utils/baseUrl";
import EditRoomScreen from "./EditRoomScreen";

export default function RoomsScreen() {
  const Token = JSON.parse(localStorage.getItem("token"));
  //get Room
  const [room, setRoom] = useState([]);

  //register a room
  const [capacity, setCapacity] = useState("");
  const [title, setTitle] = useState("");
  const [block, setBlock] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        capacity,
        title,
        block,
      };
      const result = await fetch(`${base_url}room/room`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
        body: JSON.stringify(body),
      });
      await result.json();
      window.location = "/rooms";
      toast.success("room Registered Successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get rooms
  async function getrooms() {
    try {
      const response = await fetch(`${base_url}room/rooms`);
      const getroom = await response.json();
      setRoom(getroom);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getrooms();
  }, []);

  //delete course
  async function deleteRoom(id) {
    try {
      await fetch(`${base_url}room/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
      });
      setRoom(room.filter((room) => room._id !== id));
      toast.success("room deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;
  return (
    <div style={{ display: "flex" }}>
      <SideBarDetails />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Header />
        <Container sx={{ mt: 0 }}>
          <Helmet>
            <title>Rooms</title>
          </Helmet>
          <div style={{ margin: "2rem" }}>
            <h1>Rooms</h1>
            <Card
              style={{
                display: "flex",
                padding: "2rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div style={{ width: "50%" }}>
                <form>
                  <div style={{ padding: "2rem" }}>
                    <div class="mb-2">
                      <label for="title" class="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="capacity" class="form-label">
                        Capacity
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </div>

                    <div class="mb-2">
                      <label for="block" class="form-label">
                        Block
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="block"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                      />
                    </div>

                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      onClick={onSubmitForm}
                    >
                      <Link className="link">Add Room</Link>
                    </Button>
                  </div>
                </form>
              </div>

              <div style={{ width: "60%" }}>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Title</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Block</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {room.length > 0 ? (
                      room.map((room) => (
                        <tr>
                          <th scope="row">{i++}</th>
                          <td>{room.title}</td>
                          <td>{room.capacity}</td>
                          <td>{room.block}</td>

                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: "flex" }}
                              >
                                <EditRoomScreen room={room} />
                                <Button onClick={() => deleteRoom(room._id)}>
                                  <DeleteIcon style={{ color: "red" }} />
                                </Button>
                              </ButtonGroup>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7}>No Rooms Found.Please Add New Rooms</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
