defmodule RoomReservationServerWeb.DictControllerTest do
  use RoomReservationServerWeb.ConnCase

  alias RoomReservationServer.DictContext
  alias RoomReservationServer.DictContext.Dict

  @create_attrs %{type: "some type"}
  @update_attrs %{type: "some updated type"}
  @invalid_attrs %{type: nil}

  def fixture(:dict) do
    {:ok, dict} = DictContext.create_dict(@create_attrs)
    dict
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all dicts", %{conn: conn} do
      conn = get conn, dict_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create dict" do
    test "renders dict when data is valid", %{conn: conn} do
      conn = post conn, dict_path(conn, :create), dict: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, dict_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "type" => "some type"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, dict_path(conn, :create), dict: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update dict" do
    setup [:create_dict]

    test "renders dict when data is valid", %{conn: conn, dict: %Dict{id: id} = dict} do
      conn = put conn, dict_path(conn, :update, dict), dict: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, dict_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "type" => "some updated type"}
    end

    test "renders errors when data is invalid", %{conn: conn, dict: dict} do
      conn = put conn, dict_path(conn, :update, dict), dict: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete dict" do
    setup [:create_dict]

    test "deletes chosen dict", %{conn: conn, dict: dict} do
      conn = delete conn, dict_path(conn, :delete, dict)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, dict_path(conn, :show, dict)
      end
    end
  end

  defp create_dict(_) do
    dict = fixture(:dict)
    {:ok, dict: dict}
  end
end
