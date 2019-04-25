defmodule RoomReservationServerWeb.RoomLayoutController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.RoomLayoutContext
  alias RoomReservationServer.RoomLayoutContext
  alias RoomReservationServer.RoomLayoutContext.RoomLayout

  action_fallback RoomReservationServerWeb.FallbackController

  def index(conn, params) do
    page = page(params)
    render(conn, "index.json", page: page)
  end

  # 参数中包含文件，这里参数写法相比其它稍有区别
  def create(conn, layout_params) do
    layout_changeset = RoomLayout.changeset(%RoomLayout{}, layout_params)
    IO.puts "#######################"
    IO.puts inspect layout_changeset
    with {:ok, %RoomLayout{} = layout} <- save_create(layout_changeset) do
      conn
      |> render("show.json", room_layout: layout)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, layout} <- get_by_id(RoomLayout, id) do
      url = RoomReservationServer.LayoutPic.url({layout.layout_pic, layout}, :original)
      IO.puts("getting url..............")
      IO.puts inspect url
      render(conn, "show.json", room_layout: layout)
    end
  end

  def update(conn, %{"id" => id, "room_layout" => layout_params}) do
    with {:ok, layout} <- get_by_id(RoomLayout, id) do
      layout_changeset = RoomLayout.changeset(layout, layout_params)
      with {:ok, %RoomLayout{} = layout} <- save_update(layout_changeset) do
        render(conn, "show.json", room_layout: layout)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %RoomLayout{} = layout} <- delete_by_id(RoomLayout, id) do
      render(conn, "show.json", room_layout: layout)
    end
  end
end
