import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor TourismBackend {

  // Stable storage serialized as array of entries (wallet, username)
  stable var entries : [(Text, Text)] = [];

  // In-memory HashMap for quick lookup
  let walletToUsername = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);

  // Save the current map into stable var before upgrade
  system func preupgrade() {
    entries := Iter.toArray(walletToUsername.entries());
  };

  // Restore the map from stable var after upgrade
  system func postupgrade() {
    for ((wallet, username) in entries.vals()) {
      walletToUsername.put(wallet, username);
    };
    entries := [];
  };

  // Check if a wallet address exists, and return username if yes
  public shared query func checkWallet(walletAddress : Text) : async { exists : Bool; username : ?Text } {
    switch (walletToUsername.get(walletAddress)) {
      case (?username) { { exists = true; username = ?username } };
      case null { { exists = false; username = null } };
    };
  };

  // Register a new username for a wallet address
  public shared func registerUsername(walletAddress : Text, username : Text) : async Result.Result<Text, Text> {
    if (Text.size(walletAddress) == 0) {
      return #err("Wallet address cannot be empty");
    };
    if (Text.size(username) == 0) {
      return #err("Username cannot be empty");
    };

    switch (walletToUsername.get(walletAddress)) {
      case (?existingUsername) {
        return #err("Wallet already registered with username: " # existingUsername);
      };
      case null {
        walletToUsername.put(walletAddress, username);
        return #ok("Username registered successfully");
      };
    };
  };

  // Optional: return caller's Principal for debugging
  public shared query (msg) func whoami() : async Principal {
    msg.caller
  };

  // 🔹 Added: Get total registered users
  public shared query func getUserCount() : async Nat {
    walletToUsername.size()
  };

  // 🔹 Added: Get all registered users (wallet, username)
  public shared query func getAllUsers() : async [(Text, Text)] {
    Iter.toArray(walletToUsername.entries())
  };

  // 🔹 Added: Update username for an existing wallet
  public shared func updateUsername(walletAddress : Text, newUsername : Text) : async Result.Result<Text, Text> {
    switch (walletToUsername.get(walletAddress)) {
      case null {
        return #err("Wallet not found. Please register first.");
      };
      case (?_) {
        walletToUsername.put(walletAddress, newUsername);
        return #ok("Username updated successfully");
      };
    };
  };
};
