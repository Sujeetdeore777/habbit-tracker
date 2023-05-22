
API="http://localhost:4741"
URL_PATH="/habits"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "habit":{
      "name": "'"${NAME}"'",
      "achieve": "'"${ACHIEVE}"'"
    }
  }'

  echo