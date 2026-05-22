package com.passport.service;

import com.passport.dto.request.*;
import com.passport.dto.response.*;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserProfileResponse getCurrentUserProfile(Long userId);
    UserProfileResponse updateProfile(Long userId, ProfileUpdateRequest request);
    PublicProfileResponse getPublicProfile(String slug);
}