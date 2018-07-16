defmodule RoomReservationServerWeb.LayoutController do
  use RoomReservationServerWeb, :controller

  alias RoomReservationServer.LayoutContext
  alias RoomReservationServer.LayoutContext.Layout

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, _params) do
    layouts = LayoutContext.list_layouts()
    render(conn, "index.json", layouts: layouts)
  end

  def create(conn, %{"layout" => layout_params}) do
    with {:ok, %Layout{} = layout} <- LayoutContext.create_layout(layout_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", layout_path(conn, :show, layout))
      |> render("show.json", layout: layout)
    end
  end

  def show(conn, %{"id" => id}) do
    layout = LayoutContext.get_layout!(id)
    render(conn, "show.json", layout: layout)
  end

  def update(conn, %{"id" => id, "layout" => layout_params}) do
    layout = LayoutContext.get_layout!(id)

    with {:ok, %Layout{} = layout} <- LayoutContext.update_layout(layout, layout_params) do
      render(conn, "show.json", layout: layout)
    end
  end

  def delete(conn, %{"id" => id}) do
    layout = LayoutContext.get_layout!(id)
    with {:ok, %Layout{}} <- LayoutContext.delete_layout(layout) do
      send_resp(conn, :no_content, "")
    end
  end
end
