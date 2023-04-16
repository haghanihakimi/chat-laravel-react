<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Contact;
use App\Http\Requests\ProfileRequests as Abilities;

class AcceptFollowRequest extends Command
{
    // This command is just in case if number of user is not way too many (e.g over 100 million) and 
    // number of pending requests are not so many too. This command can be good approach as long as number of
    // data is not so huge.
    // Run: php artisan schedule:work
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:acceptFollowRequests';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command periodically checks if a user has changed their account from private to publict. If YES then it automatically and continuously changes their pending follow requests status to "accepted".';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $chunkSize = 1000;
        $users = User::query();

        $users->chunk($chunkSize, function ($chunkUsers) {
            foreach ($chunkUsers as $user) {
                if (!$user->privacy) {
                    $contacts = Contact::where('contact_id', $user->id)
                    ->where('status', 'pending')->chunk($chunkSize, function($chunkContacts) {
                        foreach ($chunkContacts as $contact) {
                            $contact->status = "accepted";
                            $contact->save();
                        }
                    });
                }
            }
        });
    }
}
