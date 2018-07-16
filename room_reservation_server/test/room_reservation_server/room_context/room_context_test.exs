defmodule RoomReservationServer.RoomContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.RoomContext

  describe "rooms" do
    alias RoomReservationServer.RoomContext.Room

    @valid_attrs %{room_number: "some room_number"}
    @update_attrs %{room_number: "some updated room_number"}
    @invalid_attrs %{room_number: nil}

    def room_fixture(attrs \\ %{}) do
      {:ok, room} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RoomContext.create_room()

      room
    end

    test "list_rooms/0 returns all rooms" do
      room = room_fixture()
      assert RoomContext.list_rooms() == [room]
    end

    test "get_room!/1 returns the room with given id" do
      room = room_fixture()
      assert RoomContext.get_room!(room.id) == room
    end

    test "create_room/1 with valid data creates a room" do
      assert {:ok, %Room{} = room} = RoomContext.create_room(@valid_attrs)
      assert room.room_number == "some room_number"
    end

    test "create_room/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RoomContext.create_room(@invalid_attrs)
    end

    test "update_room/2 with valid data updates the room" do
      room = room_fixture()
      assert {:ok, room} = RoomContext.update_room(room, @update_attrs)
      assert %Room{} = room
      assert room.room_number == "some updated room_number"
    end

    test "update_room/2 with invalid data returns error changeset" do
      room = room_fixture()
      assert {:error, %Ecto.Changeset{}} = RoomContext.update_room(room, @invalid_attrs)
      assert room == RoomContext.get_room!(room.id)
    end

    test "delete_room/1 deletes the room" do
      room = room_fixture()
      assert {:ok, %Room{}} = RoomContext.delete_room(room)
      assert_raise Ecto.NoResultsError, fn -> RoomContext.get_room!(room.id) end
    end

    test "change_room/1 returns a room changeset" do
      room = room_fixture()
      assert %Ecto.Changeset{} = RoomContext.change_room(room)
    end
  end
end
