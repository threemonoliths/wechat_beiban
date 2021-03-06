defmodule RoomReservationServerWeb.Utils.DateHandler do
  
  use Timex

  def get_now() do
    Timex.now
  end

  # https://hexdocs.pm/timex/formatting.html#content
  def get_date_str(date) do
    date
    |> Timex.format!("%Y-%m-%d", :strftime)
  end
  
end