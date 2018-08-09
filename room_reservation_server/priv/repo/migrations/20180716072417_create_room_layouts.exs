defmodule RoomReservationServer.Repo.Migrations.CreateLayouts do
  use Ecto.Migration

  def change do
    create table(:room_layouts) do
      add :layout, :string, null: false
      add :layout_pic, :string
      add :uuid, :string
      add :price_01, :decimal, null: false
      add :price_02, :decimal
      add :book_price, :decimal, null: false
      add :breakfast, :boolean, null: false
      add :desc, :text
      timestamps()
    end

  end
end
