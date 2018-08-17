defmodule RoomReservationServer.Repo.Migrations.CreateCarOrders do
  use Ecto.Migration

  def change do
    create table(:car_orders) do
      add :orderNo, :string
      add :orderDate, :date
      add :kind, :string
      add :carNo, :string
      add :userNo, :string
      add :state, :string

      timestamps()
    end

  end
end
