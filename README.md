# gcloud build
'gcloud builds submit --tag gcr.io/spell-kit-creator/spellcards'

# gcloud deploy
'gcloud run deploy spellcards  --image gcr.io/spell-kit-creator/spellcards   --platform managed  --region us-central1  --allow-unauthenticated  --set-env-vars="GMAIL_USER=koi.designs.art@gmail.com,GMAIL_APP_PASSWORD=zulm mfjx sqkf fduc"'