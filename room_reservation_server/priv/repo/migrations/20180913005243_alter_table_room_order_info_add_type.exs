defmodule RoomReservationServer.Repo.Migrations.AlterTableRoomOrderInfoAddType do
  use Ecto.Migration

  def change do
    alter table(:room_order_info) do
      add :type, :string
    end
  end
end
