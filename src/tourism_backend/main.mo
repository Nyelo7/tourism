import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

// Define the actor for the tourism backend
actor {
  // Stable storage for wallet address to username mapping
  stable var entries : [(Text, Text)] = [];
  let walletToUsername = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);

  // Initialize the HashMap from stable storage on canister upgrade
  system func preupgrade() {
    entries := Iter.toArray(walletToUsername.entries());
  };

  system func postupgrade() {
    for ((wallet, username) in entries.vals()) {
      walletToUsername.put(wallet, username);
    };
    entries := [];
  };

  // Function to check if a wallet address exists and return its username
  public shared query func checkWallet(walletAddress : Text) : async { exists : Bool; username : ?Text } {
    switch (walletToUsername.get(walletAddress)) {
      case (?username) { { exists = true; username = ?username } };
      case null { { exists = false; username = null } };
    };
  };

  // Function to register a new username for a wallet address
  public shared func registerUsername(walletAddress : Text, username : Text) : async Result.Result<Text, Text> {
    // Validate inputs
    if (Text.size(walletAddress) == 0) {
      return #err("Wallet address cannot be empty");
    };
    if (Text.size(username) == 0) {
      return #err("Username cannot be empty");
    };

    // Check if wallet is already registered
    switch (walletToUsername.get(walletAddress)) {
      case (?existingUsername) {
        return #err("Wallet already registered with username: " # existingUsername);
      };
      case null {
        // Register the new username
        walletToUsername.put(walletAddress, username);
        return #ok("Username registered successfully");
      };
    };
  };

  // Optional: Function to get the caller's Principal (for debugging or future use)
  public shared query (msg) func whoami() : async Principal {
    msg.caller
  };
};