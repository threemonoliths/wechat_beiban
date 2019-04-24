defmodule RoomReservationServerWeb.CarOrderController do
  use RoomReservationServerWeb, :controller
  
  use RoomReservationServer.CarOrderContext
  alias RoomReservationServer.Accounts.User
  alias RoomReservationServer.CarOrderContext
  alias RoomReservationServer.CarOrderContext.CarOrder

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"car_order" => car_order_params} = params) do
    user_changeset = get_user_changeset(params)
    info_changeset = CarOrder.changeset(%CarOrder{}, car_order_params)
    |> Ecto.Changeset.put_assoc(:user, user_changeset)
    with {:ok, %CarOrder{} = car_order} <- save_create(info_changeset) do
      conn
      |> render("show.json", car_order: car_order)
    end   
  end

  def show(conn, %{"id" => id}) do
    with {:ok, layout} <- get_by_id(CarOrder, id, [:user]) do
      render(conn, "show.json", car_order: layout)
    end
  end

  def update(conn, %{"id" => id, "car_order" => car_order_params}) do
    with {:ok, layout} <- get_by_id(CarOrder, id) do
      layout_changeset = CarOrder.changeset(layout, car_order_params)
      with {:ok, %CarOrder{} = layout} <- save_update(layout_changeset) do
        render(conn, "show.json", car_order: layout)
      end
    end
  end


  def delete(conn, %{"id" => id}) do
    with {:ok, %CarOrder{} = layout} <- delete_by_id(CarOrder, id) do
      render(conn, "show.json", car_order: layout)
    end
  end

  defp get_user_changeset(params) do
    params
    |> Map.get("user", %{})
    |> Map.get("open_id")
    |> case do
      nil -> nil
      open_id ->
        case get_by_name(User, open_id: open_id) do
          {:error, _} -> nil
          {:ok, user} -> 
            IO.puts inspect user
            change(User, user)
        end
    end
  end

end

