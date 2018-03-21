<?php

use Illuminate\Http\Request;
use App\Http\Resources\AirportResource;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/airport/{IATA}', function ($iata) {
    return new AirportResource(App\Airport::where('iata', $iata)->first());
});

Route::get('/flights/origin/{IATA}', function ($iata) {
    return App\Flight::where('source_airport', $iata)
    ->join('airports as sourceAirport', 'source_airport_id', '=', 'sourceAirport.id')
    ->join('airports as destinationAirport', 'destination_airport_id', '=', 'destinationAirport.id')
    ->select(
      'source_airport',
      'source_airport_id',
      'sourceAirport.name as s_name',
      'sourceAirport.city as s_city',
      'sourceAirport.latitude as s_lat',
      'sourceAirport.longitude as s_long',
      'destination_airport',
      'destination_airport_id',
      'destinationAirport.name as d_name',
      'destinationAirport.city as d_city',
      'destinationAirport.latitude as d_latitude',
      'destinationAirport.longitude as d_longitude'
      )
    ->distinct()
    ->get();
});

Route::get('/flights/origin/country/{country}', function ($country) {
    return DB::table('flights')
    ->select(
      'source_airport',
      'source_airport_id',
      'sourceAirport.name as s_name',
      'sourceAirport.city as s_city',
      'sourceAirport.latitude as s_lat',
      'sourceAirport.longitude as s_long',
      'destination_airport',
      'destination_airport_id',
      'destinationAirport.name as d_name',
      'destinationAirport.city as d_city',
      'destinationAirport.latitude as d_latitude',
      'destinationAirport.longitude as d_longitude'
      )
      ->join('airports as sourceAirport', 'source_airport_id', '=', 'sourceAirport.id')
      ->join('airports as destinationAirport', 'destination_airport_id', '=', 'destinationAirport.id')
      ->where([
        ['sourceAirport.country', $country],
        ['destinationAirport.country', '!=', $country]
      ])
      ->take(10)
      ->get();
});
