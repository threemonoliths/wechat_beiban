defmodule RoomReservationServer.CarOrderContextTest do
  use RoomReservationServer.DataCase

  alias RoomReservationServer.CarOrderContext

  describe "car_orders" do
    alias RoomReservationServer.CarOrderContext.CarOrder

    @valid_attrs %{carNo: "some carNo", kind: "some kind", orderDate: ~D[2010-04-17], orderNo: "some orderNo", state: "some state", userNo: "some userNo"}
    @update_attrs %{carNo: "some updated carNo", kind: "some updated kind", orderDate: ~D[2011-05-18], orderNo: "some updated orderNo", state: "some updated state", userNo: "some updated userNo"}
    @invalid_attrs %{carNo: nil, kind: nil, orderDate: nil, orderNo: nil, state: nil, userNo: nil}

    def car_order_fixture(attrs \\ %{}) do
      {:ok, car_order} =
        attrs
        |> Enum.into(@valid_attrs)
        |> CarOrderContext.create_car_order()

      car_order
    end

    test "list_car_orders/0 returns all car_orders" do
      car_order = car_order_fixture()
      assert CarOrderContext.list_car_orders() == [car_order]
    end

    test "get_car_order!/1 returns the car_order with given id" do
      car_order = car_order_fixture()
      assert CarOrderContext.get_car_order!(car_order.id) == car_order
    end

    test "create_car_order/1 with valid data creates a car_order" do
      assert {:ok, %CarOrder{} = car_order} = CarOrderContext.create_car_order(@valid_attrs)
      assert car_order.carNo == "some carNo"
      assert car_order.kind == "some kind"
      assert car_order.orderDate == ~D[2010-04-17]
      assert car_order.orderNo == "some orderNo"
      assert car_order.state == "some state"
      assert car_order.userNo == "some userNo"
    end

    test "create_car_order/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CarOrderContext.create_car_order(@invalid_attrs)
    end

    test "update_car_order/2 with valid data updates the car_order" do
      car_order = car_order_fixture()
      assert {:ok, car_order} = CarOrderContext.update_car_order(car_order, @update_attrs)
      assert %CarOrder{} = car_order
      assert car_order.carNo == "some updated carNo"
      assert car_order.kind == "some updated kind"
      assert car_order.orderDate == ~D[2011-05-18]
      assert car_order.orderNo == "some updated orderNo"
      assert car_order.state == "some updated state"
      assert car_order.userNo == "some updated userNo"
    end

    test "update_car_order/2 with invalid data returns error changeset" do
      car_order = car_order_fixture()
      assert {:error, %Ecto.Changeset{}} = CarOrderContext.update_car_order(car_order, @invalid_attrs)
      assert car_order == CarOrderContext.get_car_order!(car_order.id)
    end

    test "delete_car_order/1 deletes the car_order" do
      car_order = car_order_fixture()
      assert {:ok, %CarOrder{}} = CarOrderContext.delete_car_order(car_order)
      assert_raise Ecto.NoResultsError, fn -> CarOrderContext.get_car_order!(car_order.id) end
    end

    test "change_car_order/1 returns a car_order changeset" do
      car_order = car_order_fixture()
      assert %Ecto.Changeset{} = CarOrderContext.change_car_order(car_order)
    end
  end
end
