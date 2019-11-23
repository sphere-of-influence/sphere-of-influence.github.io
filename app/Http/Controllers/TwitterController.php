<?php

namespace App\Http\Controllers;

class TwitterController extends Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
        $this->accounts = [
            '1091832513063014402', // sleeping in snow
            //'861649633059196929' // old new standard
        ];
    }

    public function scout()
    {

        $timeline = [];

        foreach( $this->accounts as $account ) {
            $timeline = array_merge( \Twitter::getUserTimeline( ['user_id' => $account, 'count' => 20]) );
        }
        
        // filter tweets
        $timeline = array_filter($timeline, function($tweet) {
            return ! strpos($tweet->text, '#aboutSphereOfInfluence');
        });

        // tidy up the objects
        $timeline = array_map(function($tweet) {

            $id = $tweet->is_quote_status ? $tweet->quoted_status_id_str : $tweet->id_str;

            return (object) [
                'id' => $id,
                'date' => $tweet->created_at,
                'place' => $tweet->place
            ];

        }, $timeline);

        return response()->json($timeline, 200, array(), JSON_PRETTY_PRINT);

    }

    //
}
