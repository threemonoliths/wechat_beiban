defmodule RoomReservationServerWeb.AdminUserView do
  use RoomReservationServerWeb, :view
  alias RoomReservationServerWeb.AdminUserView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, AdminUserView, "admin_user.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{admin_user: admin_user}) do
    %{data: render_one(admin_user, AdminUserView, "admin_user.json")}
  end

  def render("admin_user.json", %{admin_user: admin_user}) do
    %{id: admin_user.id,
      name: admin_user.name}
  end
end
