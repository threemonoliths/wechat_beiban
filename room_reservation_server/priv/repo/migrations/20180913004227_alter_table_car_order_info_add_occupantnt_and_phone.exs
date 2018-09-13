defmodule RoomReservationServer.Repo.Migrations.AlterTableCarOrderInfoAddOccupantntAndPhone do
  use Ecto.Migration

  def change do
    alter table(:car_orders) do
      add :occupant, :string
      add :phone, :string
    end
  end
end
