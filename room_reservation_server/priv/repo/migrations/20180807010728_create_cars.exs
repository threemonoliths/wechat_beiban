defmodule RoomReservationServer.Repo.Migrations.CreateCars do
  use Ecto.Migration

  def change do
    create table(:cars) do
      add :no, :string
      add :kind, :string
      add :pic, :string
      add :price, :decimal
      add :buydate, :date
      add :orderdate, :date
      add :usedate, :date
      add :state, :string

      timestamps()
    end

  end
end
