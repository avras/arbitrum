//
//  tokenTracker.cpp
//  AVMtest
//
//  Created by Timothy O'Bryan on 6/19/19.
//

#include "avm/tokenTracker.hpp"

bool isToken(TokenType tok){
    return tok[20] == 0;
}

uint256_t fromTokenType(TokenType &tok){
    std::vector<unsigned char> val;
    val.resize(32);
    std::copy(tok.begin(), tok.end(), val.begin());
    return from_big_endian(val.begin(), val.end());
}

void toTokenType(uint256_t tokTypeVal, TokenType &tok){
    std::vector<unsigned char> val;
    val.resize(32);
    to_big_endian(tokTypeVal, val.begin());
    std::copy(val.begin(), val.begin()+21, tok.begin());
}

bool BalanceTracker::CanSpend(TokenType tokType, uint256_t amount){
    // if token is fungible check that the spend amount <= the amount assigned to that token
    if(isToken(tokType)){
        return (amount <= tokenAmounts[tokenLookup[tokType]]);
    } else {
        // for non-fungible tokens, check that amount == amount assigned to that token
        nftKey key = {tokType, amount};
        std::map<nftKey,int>::iterator it = NFTLookup.find(key);
        if (it == NFTLookup.end()){
            return false;
        }
        return tokenAmounts[it->second] == amount;
    }
}

bool BalanceTracker::Spend(TokenType tokType, uint256_t amount){
    if (!CanSpend(tokType, amount)) {
        //        errors.New("not enough balance to spend")
        return false;
    }
    
    if(isToken(tokType)){
        tokenAmounts[tokenLookup[tokType]] -= amount;
        return true;
    } else {
        // for non-fungible tokens, check that amount == amount assigned to that token
        nftKey key = {tokType, amount};
        std::map<nftKey,int>::iterator it = NFTLookup.find(key);
        if (it == NFTLookup.end()){
            return false;
        }
        tokenAmounts[it->second] = 0;
        return true;
    }
}

void BalanceTracker::add(TokenType tokType, uint256_t amount){
    if(isToken(tokType)){
        std::map<TokenType,int>::iterator it = tokenLookup.find(tokType);
        if (it == tokenLookup.end()){
            //add token
            tokenAmounts.push_back(amount);
            tokenLookup.insert(std::pair<TokenType, int>(tokType, tokenAmounts.size()-1));
        } else {
            //add amount to token
            tokenAmounts[it->second] += amount;
        }
    } else {
        nftKey key = {tokType, amount};
        std::map<nftKey,int>::iterator it = NFTLookup.find(key);
        if (it == NFTLookup.end()){
            // add token
            tokenAmounts.push_back(amount);
            NFTLookup.insert(std::pair<nftKey, int>(key, tokenAmounts.size()-1));
        } else {
            //set amount
            tokenAmounts[it->second] = amount;
        }
    }
}

uint256_t BalanceTracker::tokenValue(TokenType tokType){
    // if token is fungible check that the spend amount <= the amount assigned to that token
    if(isToken(tokType)){
        return tokenAmounts[tokenLookup[tokType]];
    } else {
        // for non-fungible tokens, check that amount == amount assigned to that token
        nftKey key = {tokType, 1};
        std::map<nftKey,int>::iterator it = NFTLookup.find(key);
        if (it == NFTLookup.end()){
            return 0;
        }
        return tokenAmounts[it->second];
    }
}
