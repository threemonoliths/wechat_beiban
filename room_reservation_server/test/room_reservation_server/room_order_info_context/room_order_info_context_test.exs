defmodule RoomReservationServer.RoomOrderInfoContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.RoomOrderInfoContext

  describe "room_order_info" do
    alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo

    @valid_attrs %{room_id: "some room_id"}
    @update_attrs %{room_id: "some updated room_id"}
    @invalid_attrs %{room_id: nil}

    def room_order_info_fixture(attrs \\ %{}) do
      {:ok, room_order_info} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RoomOrderInfoContext.create_room_order_info()

      room_order_info
    end

    test "list_room_order_info/0 returns all room_order_info" do
      room_order_info = room_order_info_fixture()
      assert RoomOrderInfoContext.list_room_order_info() == [room_order_info]
    end

    test "get_room_order_info!/1 returns the room_order_info with given id" do
      room_order_info = room_order_info_fixture()
      assert RoomOrderInfoContext.get_room_order_info!(room_order_info.id) == room_order_info
    end

    test "create_room_order_info/1 with valid data creates a room_order_info" do
      assert {:ok, %RoomOrderInfo{} = room_order_info} = RoomOrderInfoContext.create_room_order_info(@valid_attrs)
      assert room_order_info.room_id == "some room_id"
    end

    test "create_room_order_info/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RoomOrderInfoContext.create_room_order_info(@invalid_attrs)
    end

    test "update_room_order_info/2 with valid data updates the room_order_info" do
      room_order_info = room_order_info_fixture()
      assert {:ok, room_order_info} = RoomOrderInfoContext.update_room_order_info(room_order_info, @update_attrs)
      assert %RoomOrderInfo{} = room_order_info
      assert room_order_info.room_id == "some updated room_id"
    end

    test "update_room_order_info/2 with invalid data returns error changeset" do
      room_order_info = room_order_info_fixture()
      assert {:error, %Ecto.Changeset{}} = RoomOrderInfoContext.update_room_order_info(room_order_info, @invalid_attrs)
      assert room_order_info == RoomOrderInfoContext.get_room_order_info!(room_order_info.id)
    end

    test "delete_room_order_info/1 deletes the room_order_info" do
      room_order_info = room_order_info_fixture()
      assert {:ok, %RoomOrderInfo{}} = RoomOrderInfoContext.delete_room_order_info(room_order_info)
      assert_raise Ecto.NoResultsError, fn -> RoomOrderInfoContext.get_room_order_info!(room_order_info.id) end
    end

    test "change_room_order_info/1 returns a room_order_info changeset" do
      room_order_info = room_order_info_fixture()
      assert %Ecto.Changeset{} = RoomOrderInfoContext.change_room_order_info(room_order_info)
    end
  end
end
