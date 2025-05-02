<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function getLocation($city, $state = null, $country = null, $limit = 1)
    {
        $query = $city;
        if ($state) $query .= ',' . $state;
        if ($country) $query .= ',' . $country;

        $response = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $query,
            'limit' => $limit,
            'appid' => config('services.openweather.key'),
        ]);

        return $response->json();
    }

    public function getWeatherByCoordinates($lat, $lon, $exclude = 'hourly,daily')
{
    $response = Http::get('https://api.openweathermap.org/data/3.0/onecall', [
        'lat' => $lat,
        'lon' => $lon,
        'exclude' => $exclude,
        'appid' => config('services.openweather.key'),
    ]);

    return $response->json();
}
}
