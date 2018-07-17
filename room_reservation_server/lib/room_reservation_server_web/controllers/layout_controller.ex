defmodule RoomReservationServerWeb.LayoutController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.LayoutContext
  alias RoomReservationServer.LayoutContext
  alias RoomReservationServer.LayoutContext.Layout

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"layout" => layout_params}) do
    layout_changeset = Layout.changeset(%Layout{}, layout_params)
    with {:ok, %Layout{} = layout} <- save_create(layout_changeset) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", layout_path(conn, :show, layout))
      |> render("show.json", layout: layout)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, layout} <- get_by_id(Layout, id) do
      render(conn, "show.json", layout: layout)
    end
  end

  def update(conn, %{"id" => id, "layout" => layout_params}) do
    with {:ok, layout} <- get_by_id(Layout, id) do
      layout_changeset = Layout.changeset(layout, layout_params)
      with {:ok, %Layout{} = layout} <- save_update(layout_changeset) do
        render(conn, "show.json", layout: layout)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Layout{} = layout} <- delete_by_id(Layout, id) do
      render(conn, "show.json", layout: layout)
    end
  end
end
