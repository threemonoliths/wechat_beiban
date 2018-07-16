defmodule RoomReservationServerWeb.RoomOrderInfoControllerTest do
  use RoomReservationServerWeb.ConnCase

  alias RoomReservationServer.RoomOrderInfoContext
  alias RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo

  @create_attrs %{room_id: "some room_id"}
  @update_attrs %{room_id: "some updated room_id"}
  @invalid_attrs %{room_id: nil}

  def fixture(:room_order_info) do
    {:ok, room_order_info} = RoomOrderInfoContext.create_room_order_info(@create_attrs)
    room_order_info
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all room_order_info", %{conn: conn} do
      conn = get conn, room_order_info_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create room_order_info" do
    test "renders room_order_info when data is valid", %{conn: conn} do
      conn = post conn, room_order_info_path(conn, :create), room_order_info: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, room_order_info_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "room_id" => "some room_id"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, room_order_info_path(conn, :create), room_order_info: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update room_order_info" do
    setup [:create_room_order_info]

    test "renders room_order_info when data is valid", %{conn: conn, room_order_info: %RoomOrderInfo{id: id} = room_order_info} do
      conn = put conn, room_order_info_path(conn, :update, room_order_info), room_order_info: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, room_order_info_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "room_id" => "some updated room_id"}
    end

    test "renders errors when data is invalid", %{conn: conn, room_order_info: room_order_info} do
      conn = put conn, room_order_info_path(conn, :update, room_order_info), room_order_info: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete room_order_info" do
    setup [:create_room_order_info]

    test "deletes chosen room_order_info", %{conn: conn, room_order_info: room_order_info} do
      conn = delete conn, room_order_info_path(conn, :delete, room_order_info)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, room_order_info_path(conn, :show, room_order_info)
      end
    end
  end

  defp create_room_order_info(_) do
    room_order_info = fixture(:room_order_info)
    {:ok, room_order_info: room_order_info}
  end
end
