defmodule RoomReservationServerWeb.CarController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.CarContext
  alias RoomReservationServer.CarContext
  alias RoomReservationServer.CarContext.Car

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"car" => car_params}) do
    layout_changeset = Car.changeset(%Car{}, car_params)
    with {:ok, %Car{} = layout} <- save_create(layout_changeset) do
      conn
      |> render("show.json", car: layout)
    end    
  end

  def show(conn, %{"id" => id}) do
    with {:ok, layout} <- get_by_id(Car, id) do
      render(conn, "show.json", car: layout)
    end
  end

  def update(conn, %{"id" => id, "car" => car_params}) do
    with {:ok, layout} <- get_by_id(Car, id) do
      layout_changeset = Car.changeset(layout, car_params)
      with {:ok, %Car{} = layout} <- save_update(layout_changeset) do
        render(conn, "show.json", car: layout)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Car{} = layout} <- delete_by_id(Car, id) do
      render(conn, "show.json", car: layout)
    end
  end
end
