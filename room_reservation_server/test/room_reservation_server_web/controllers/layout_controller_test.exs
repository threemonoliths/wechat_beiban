defmodule RoomReservationServerWeb.LayoutControllerTest do
  use RoomReservationServerWeb.ConnCase

  alias RoomReservationServer.LayoutContext
  alias RoomReservationServer.LayoutContext.Layout

  @create_attrs %{layout: "some layout"}
  @update_attrs %{layout: "some updated layout"}
  @invalid_attrs %{layout: nil}

  def fixture(:layout) do
    {:ok, layout} = LayoutContext.create_layout(@create_attrs)
    layout
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all layouts", %{conn: conn} do
      conn = get conn, layout_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create layout" do
    test "renders layout when data is valid", %{conn: conn} do
      conn = post conn, layout_path(conn, :create), layout: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, layout_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "layout" => "some layout"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, layout_path(conn, :create), layout: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update layout" do
    setup [:create_layout]

    test "renders layout when data is valid", %{conn: conn, layout: %Layout{id: id} = layout} do
      conn = put conn, layout_path(conn, :update, layout), layout: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, layout_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "layout" => "some updated layout"}
    end

    test "renders errors when data is invalid", %{conn: conn, layout: layout} do
      conn = put conn, layout_path(conn, :update, layout), layout: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete layout" do
    setup [:create_layout]

    test "deletes chosen layout", %{conn: conn, layout: layout} do
      conn = delete conn, layout_path(conn, :delete, layout)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, layout_path(conn, :show, layout)
      end
    end
  end

  defp create_layout(_) do
    layout = fixture(:layout)
    {:ok, layout: layout}
  end
end
