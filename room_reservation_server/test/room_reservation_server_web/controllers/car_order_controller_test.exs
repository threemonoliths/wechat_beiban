defmodule RoomReservationServerWeb.CarOrderControllerTest do
  use RoomReservationServerWeb.ConnCase

  alias RoomReservationServer.CarOrderContext
  alias RoomReservationServer.CarOrderContext.CarOrder

  @create_attrs %{carNo: "some carNo", kind: "some kind", orderDate: ~D[2010-04-17], orderNo: "some orderNo", state: "some state", userNo: "some userNo"}
  @update_attrs %{carNo: "some updated carNo", kind: "some updated kind", orderDate: ~D[2011-05-18], orderNo: "some updated orderNo", state: "some updated state", userNo: "some updated userNo"}
  @invalid_attrs %{carNo: nil, kind: nil, orderDate: nil, orderNo: nil, state: nil, userNo: nil}

  def fixture(:car_order) do
    {:ok, car_order} = CarOrderContext.create_car_order(@create_attrs)
    car_order
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all car_orders", %{conn: conn} do
      conn = get conn, car_order_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create car_order" do
    test "renders car_order when data is valid", %{conn: conn} do
      conn = post conn, car_order_path(conn, :create), car_order: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, car_order_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "carNo" => "some carNo",
        "kind" => "some kind",
        "orderDate" => ~D[2010-04-17],
        "orderNo" => "some orderNo",
        "state" => "some state",
        "userNo" => "some userNo"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, car_order_path(conn, :create), car_order: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update car_order" do
    setup [:create_car_order]

    test "renders car_order when data is valid", %{conn: conn, car_order: %CarOrder{id: id} = car_order} do
      conn = put conn, car_order_path(conn, :update, car_order), car_order: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, car_order_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "carNo" => "some updated carNo",
        "kind" => "some updated kind",
        "orderDate" => ~D[2011-05-18],
        "orderNo" => "some updated orderNo",
        "state" => "some updated state",
        "userNo" => "some updated userNo"}
    end

    test "renders errors when data is invalid", %{conn: conn, car_order: car_order} do
      conn = put conn, car_order_path(conn, :update, car_order), car_order: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete car_order" do
    setup [:create_car_order]

    test "deletes chosen car_order", %{conn: conn, car_order: car_order} do
      conn = delete conn, car_order_path(conn, :delete, car_order)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, car_order_path(conn, :show, car_order)
      end
    end
  end

  defp create_car_order(_) do
    car_order = fixture(:car_order)
    {:ok, car_order: car_order}
  end
end
